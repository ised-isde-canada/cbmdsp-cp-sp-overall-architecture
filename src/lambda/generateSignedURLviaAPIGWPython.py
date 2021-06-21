# from https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/generateSignedURLviaAPIGWPython?tab=code
# API-GW: https://us-west-2.console.aws.amazon.com/apigateway/home?region=us-west-2#/apis/kvzryfi6hc/resources/sfpwm6v31b/methods/GET
# Hosting: http://portals3.cloudlift.systems/lambda.html
# URL: https://kvzryfi6hc.execute-api.us-west-2.amazonaws.com/test
# project: https://github.com/ised-isde-canada/cbmdsp-cp-sp-overall-architecture

#import json
#def lambda_handler(event, context):
#    return {
#        'statusCode': 200,
#        'body': json.dumps('processing')
#    }

import uuid
import boto3

def lambda_handler(event, context):
    # Get the service client.
    s3 = boto3.client('s3')

    # Generate a random S3 key name
    upload_key = uuid.uuid4().hex

    # Generate the presigned URL for put requests
    presigned_url = s3.generate_presigned_url(
        ClientMethod='put_object',
        Params={
            'Bucket': 'lambda.input.uswest2.packet.global',
            'Key': upload_key
        }
    )

    # Return the presigned URL
    return {
        "upload_url": presigned_url
    }