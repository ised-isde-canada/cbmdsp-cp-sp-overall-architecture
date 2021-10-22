//© 2021 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.

// This AWS Content is provided subject to the terms of the AWS Customer Agreement
// available at http://aws.amazon.com/agreement or other written agreement between
// Customer and either Amazon Web Services, Inc. or Amazon Web Services EMEA SARL or both.


const upload_portal_url = "https://09ovr505x9.execute-api.ca-central-1.amazonaws.com/dev";
let initate_mp_upload_url = upload_portal_url + "/initiate-mp-upload";
let get_mpu_url = upload_portal_url + "/generate-presigned-url";
let complete_mpu_url = upload_portal_url + "/complete-mp-upload";

console.log(initate_mp_upload_url);
console.log(get_mpu_url);
console.log(complete_mpu_url);


const uploadFiles = document.getElementById('uploadFile')
const uploadFileInfo = document.getElementById('uploadFileInfo');

const btn = document.querySelector('.btn');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.uploadFile');
let attemptCounter = false;


if (window.FileList && window.File) {
  uploadFiles.addEventListener('change', event => {
    uploadFileInfo.innerHTML = '';
    for (const file of event.target.files) {
      const li = document.createElement('li');
      const name = file.name ? file.name : 'NOT SUPPORTED';
      const type = file.type ? file.type : 'NOT SUPPORTED';
      const size = file.size ? file.size : 'NOT SUPPORTED';
      li.textContent = `name: ${name}, type: ${type}, size: ${size}`;
      uploadFileInfo.appendChild(li);

      btn.addEventListener('click',(e)=>{

        let fileUploadRequest = {'fileName': name};
        console.log(fileUploadRequest);

        const upload = async() => {

          data= await postData(initate_mp_upload_url, fileUploadRequest);
          //.then(data => {
          {

            console.log(data['uploadId']);

            let part_number = 1;
            var parts = [];
            // 5MB, can be adjusted as necessary
            var chunk_size = 5 * 1024 * 1024;
            var offset = 0;
            
            var i=0;
            while( i<size ) {
              
              var getPreSignUrlRequest = {
                'fileName': name,
                'uploadId': data['uploadId'],
                'partNumber': part_number
              };

              preSignedData = await postData(get_mpu_url, getPreSignUrlRequest);

              console.log(part_number);
              console.log(preSignedData['signedUrl']);

              var blob = await file.slice(offset, offset + chunk_size); //slice the file by specifying the index(chunk size)
              //var reader = new FileReader();
              //reader.readAsBinaryString(blob);
              //reader.onloadend = function () {
              //  console.log('DONE', reader.readyState); // readyState will be 2
              //};              

              //reader.onload = function () {
              //  console.log(reader.result);
              //}
              console.log(type);
              console.log('Uploading...:' + blob.size + ' bytes\n');
            
              //retCode = await putDatatoS3(preSignedData['signedUrl'], blob, type);

              //parts.push({'ETag': retCode['etag'], 'PartNumber': part_number});

              retCode = await axios.put(
                preSignedData['signedUrl'], 
                blob, 
                { headers: {'Content-Type': type} }
                );
              console.log('   Upload no ' + part_number + '; Etag: ' + retCode.headers.etag)
              console.log(retCode.headers)
              parts.push({'ETag': retCode.headers.etag, 'PartNumber': part_number});



              offset += chunk_size; // Increment the index position(chunk) 
              i += chunk_size; // Keeping track of when to exit, by incrementing till we reach file size(end of file).
              part_number = part_number + 1;

              console.log(i);
            }

            complete_request = {
              'fileName': name, 
              'uploadId': data['uploadId'], 
              'parts': parts
              };

            retCode = await postData(complete_mpu_url, complete_request);        
          }
        };

        upload();

      });
    };
  }); 


}

// Example POST method implementation:
async function postData(url = '', data = {}) {
  console.log(url);
  console.log(JSON.stringify(data));
  response = await fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const returndata = await response.json();

  console.log(returndata);
  
  return returndata;
}

// Example POST method implementation:
async function putDatatoS3(url = '', data, type) {
  console.log(url);
  console.log(type);
  response = await fetch(url, {
    method: 'put',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate',
      'Content-Type': type

    },
    body: data
  });
  console.log(await response);
  for (var pair of await response.headers.entries()) {
    console.log(pair[0]+ ': '+ pair[1]);
    if (pair[0] == 'etag') {
      console.log(pair[1]);
      var returndata = {'etag': pair[1]};
    }
  }

  console.log(returndata);
  
  return returndata;
}


