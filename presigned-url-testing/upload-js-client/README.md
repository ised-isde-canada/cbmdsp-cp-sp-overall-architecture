# Pre-Signed URL multipart upload Javascript Library

This code creates a demo Javascript Library to interact with Pre-Signed URL Proxy backend implemented as [Lambda function](../upload-portal-api/) in python code.

## Deploying the Javascript Library

### Prerequisites

To deploy this solution, you will need to ensure:

* `upload-portal-api` has been deployed, please refer to [this document](../README.md).

* After `upload-portal-api` is deployed, please change the invoke URL in [app.js](./app.js).

* S3 bucket has been created. please ensure the [CORS configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html) has been setup properly. An example of CORS configuration is ass following:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE",
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [
            "Content-Type",
            "Content-Length",
            "Connection",
            "Date",
            "ETag",
            "x-amz-delete-marker",
            "x-amz-id-2",
            "x-amz-request-id",
            "x-amz-version-id"
        ]
    }
]
```

### Testing

open the `index.html` file in the browser, and upload a single file.
