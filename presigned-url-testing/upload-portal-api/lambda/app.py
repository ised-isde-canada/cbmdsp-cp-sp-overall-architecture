import boto3
import os
import json
from aws_lambda_powertools import Logger
from aws_lambda_powertools.logging import correlation_paths
from aws_lambda_powertools.event_handler.api_gateway import ApiGatewayResolver, Response, CORSConfig

logger = Logger()
cors_config = CORSConfig(
    allow_origin="*",
    expose_headers=["x-exposed-response-header"],
    allow_headers=["x-custom-request-header"],
    max_age=100,
    allow_credentials=True,
)
app = ApiGatewayResolver(cors=cors_config)
#app = ApiGatewayResolver( debug=True )
s3_client = boto3.client('s3')
upload_portal_bucket = os.environ['UploadPortalBucket']

# Example of expected body for /initiate-mp-upload
# {
#   "fileName": "user/somefile.json"
# }

@app.post("/initiate-mp-upload", cors=True)
def initiate_upload():
  json_payload = app.current_event.json_body

  file_name = json_payload['fileName']

  res = s3_client.create_multipart_upload(
    Bucket=upload_portal_bucket,
    Key=file_name
  )

  return {'uploadId': res['UploadId']}



# Example of expected body for /generate-presigned-url
# {
#   "fileName": "user/somefile.json",
#   "uploadId": "something",
#   "partNumber": 1
# }

@app.post("/generate-presigned-url", cors=True)
def generate_presigned_url():
  json_payload = app.current_event.json_body

  file_name = json_payload['fileName']
  upload_id = json_payload['uploadId']
  part_number = json_payload['partNumber']

  signed_url = s3_client.generate_presigned_url(ClientMethod='upload_part',Params={'Bucket': upload_portal_bucket, 'Key': file_name, 'UploadId': upload_id, 'PartNumber': part_number})

  return Response(status_code=200,
    content_type='application/json',
    body=json.dumps({
        "signedUrl": signed_url
    })
  )



# Example of expected body for /complete-mp-upload
#  {
#   "fileName": "user/somefile.json",
#   "uploadId": "something",
#   "parts": "array of parts"
# }

@app.post("/complete-mp-upload", cors=True)
def complete_upload():
  json_payload = app.current_event.json_body

  file_name = json_payload['fileName']
  upload_id = json_payload['uploadId']
  parts = json_payload['parts']

  res = s3_client.complete_multipart_upload(Bucket=upload_portal_bucket, Key=file_name, MultipartUpload={'Parts': parts}, UploadId=upload_id)

  return Response(status_code=200,
    content_type='application/json',
    body=json.dumps({
        "message": "Upload complete!"
    })
  )

@logger.inject_lambda_context(correlation_id_path=correlation_paths.API_GATEWAY_REST)
def lambda_handler(event, context):
  return app.resolve(event, context)
