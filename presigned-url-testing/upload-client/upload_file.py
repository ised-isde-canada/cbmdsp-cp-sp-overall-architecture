import requests
import json
import sys

file_name = sys.argv[1]
max_chunk_size = 5 * 1024 * 1024 # 5MB, can be adjusted as necessary

# This value should be the UploadPortalApi output from your CFN stack, in the format: 
# https://${RestApi}.execute-api.${AWS::Region}.amazonaws.com/${Environment}/
upload_portal_url = ""

initiate_mpu_url = upload_portal_url + "/initiate-mp-upload"
get_mpu_url = upload_portal_url + "/generate-presigned-url"
complete_mpu_url = upload_portal_url + "/complete-mp-upload"

parts = []
part_number = 1

def upload_data(upload_id, piece):
  global part_number

  request_body = json.dumps({
    "fileName": file_name,
    "uploadId": upload_id,
    "partNumber": part_number
  })

  # Get pre-signed URL for this part
  get_psu_res = requests.post(get_mpu_url,
                      data=request_body)

  pre_signed_url = json.loads(get_psu_res.content)['signedUrl']

  # Uncomment the lines below to see each part of the upload in progress
  # print("Uploading part number " + str(part_number) + " to " + pre_signed_url)
  # print("Request body (minus data):")
  # print(request_body)
  # print("\n\n\n")

  put_data_res = requests.put(pre_signed_url, data=piece)

  # We need to track all the parts and ETags so S3 can rebuild the object
  etag = put_data_res.headers['ETag']
  parts.append({'ETag': etag, 'PartNumber': part_number})

  # Increment the part number for the next piece
  part_number += 1

def read_in_chunks(file_object, chunk_size=max_chunk_size):
    while True:
        data = file_object.read(chunk_size)
        if not data:
            break
        yield data

# 1. Get new Upload ID
initiate_upload_body = json.dumps({
  "fileName": file_name
})

initial_upload_request = requests.post(initiate_mpu_url,
                                       data=initiate_upload_body)

upload_id = json.loads(initial_upload_request.content)['uploadId']

# 2. Split file into chunks and upload
with open(file_name) as f:
    for data_slice in read_in_chunks(f):
        upload_data(upload_id, data_slice)
    f.close()

# 3. Tell S3 that all parts of the file have been successfully uploaded
complete_upload_body = json.dumps({
  "fileName": file_name,
  "uploadId": upload_id,
  "parts": parts
})

complete_upload_request = requests.post(complete_mpu_url,
                                        data=complete_upload_body)
