# from https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/generateSignedURLviaAPIGWPython?tab=code
# API-GW: https://ca-central-1.console.aws.amazon.com/apigateway/home?region=ca-central-1#/apis/e0r25oiut3/resources/nanyxkkxbl
# Hosting: http://portals3.cloudlift.systems/lambda.html
# URL: https://kvzryfi6hc.execute-api.us-west-2.amazonaws.com/test
# project: https://github.com/ised-isde-canada/cbmdsp-cp-sp-overall-architecture
# Prereq: lambda execution roles include s3 and dynamodb execute permissions
# https://console.aws.amazon.com/iam/home?#/roles/cb_sp_portalGenerateSignedURLviaAPIGWPython-role-piui2kgm?section=permissions

import uuid
import boto3

def lambda_handler(event, context):
    # Get the service client.
    s3 = boto3.client('s3')
    db = boto3.client('dynamodb')

    # Generate a random S3 key name
    upload_key = uuid.uuid4().hex

    # Generate the presigned URL for put requests
    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params={
            'Bucket': 'cb-sp-dynamic-upload-test',
            'Key': upload_key
        }
    )
    
    data = db.get_item(
      TableName='eventstream',
      Key={"timestamp": {"S":"1002"}, "label": {"S":"auto"}}
    )
    print(data);

    # Return the presigned URL
    return {
        "upload_url": presigned_url
    }