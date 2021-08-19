# Pre-Signed URL Proxy
This code creates an API Gateway designed to act as an S3 pre-signed URL generator for public clients that need to upload files to S3, but do not have AWS credentials. Clients can request a new multipart upload be created, request pre-signed URLs for each part of the object (as many as they need), and then complete the upload once all pieces have been uploaded. There is a sample client script which can be used to test the API.

## Deploying the CFN template
### Prerequisites
To deploy this solution you will need the following installed on your local machine:
* [cfn-cli](https://github.com/Kotaimen/awscfncli)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) with valid credentials configured for the account you want to deploy to
* [SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
* [make](https://www.gnu.org/software/make/)

### Update cfn-cli.yaml Parameters
The `cfn-cli.yaml` file defines the parameters that the CloudFormation stack will use when creating resources. In this case, there are only two parameters which need to be provided on lines 18 and 19: `Environment` and `UploadPortalBucket`. The Environment parameter value can be anything, and is provided only to help differentiate multiple deployments of this API in the same account/region. 

The value of UploadPortalBucket parameter will be used to create a new S3 bucket with that name in your account, so it is important that you choose a _globally unique_ name, otherwise the CFN stack will fail to provision.

### Generate the SAM template
From the `presigned-url-testing` folder, run the following command:
  ```
  make -C upload-portal-api build
  ```
This will package up our backend Lambda function and generate the CFN template we reference in the `cfn-cli.yaml` file

### Deploy the CloudFormation template
From the `presigned-url-testing` folder, run the following command:
  ```
  cfn-cli stack deploy
  ```
This will deploy all stacks in the `cfn-cli.yaml` file.

## Testing
### Prerequisites
To use `upload-client/upload_file.py`, you will need Python (preferably >=3.0) and pip installed on your local machine. Once installed, run `pip install requests` to install the requests package which the test script uses.

You also need to update one line in `upload_file.py`. The `upload_portal_url` on line 10 must be updated to be the value of `UploadPortalApi`, which is a value output from your CloudFormation template once it is deployed. You can view CloudFormation outputs in the console. Click the stack, then select the Outputs tab. 
### Running the test script
You will need to provide a test file to upload. Add the file to the `upload-client` directory, then run the script using:
```
  python upload_file.py [FILE_TO_UPLOAD]
```
The file should be uploaded to the `UploadPortalBucket`, with the same file name.
