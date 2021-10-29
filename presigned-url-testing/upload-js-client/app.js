//© 2021 Amazon Web Services, Inc. or its affiliates. All Rights Reserved.

// This AWS Content is provided subject to the terms of the AWS Customer Agreement
// available at http://aws.amazon.com/agreement or other written agreement between
// Customer and either Amazon Web Services, Inc. or Amazon Web Services EMEA SARL or both.


// This upload portal url needs to be changed with the API gateway invoke URL.
// This URL could be found in API Gateway console page after upload-portal-api is deployed.
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
    };
  }); 

  btn.addEventListener('click',(e)=>{

    var startTime = performance.now();

    var file = document.getElementById("uploadFile").files[0];
    const name = file.name;
    const type = file.type;
    const size = file.size;

    let fileUploadRequest = {'fileName': name};
    console.log(fileUploadRequest);

    const upload = async() => {

      data= await postData(initate_mp_upload_url, fileUploadRequest);
      //.then(data => {
      {

        output.innerHTML = "Uploading " + name + " sizing: " + size;
        console.log(data['uploadId']);

        let part_number = 1;
        var parts = [];
        // 5MB, can be adjusted as necessary
        var chunk_size = 5 * 1024 * 1024;
        var offset = 0;
        let promiseArray = [];
        
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

          var blob = file.slice(offset, offset + chunk_size); //slice the file by specifying the index(chunk size)
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

          retCode = axios.put(
            preSignedData['signedUrl'], 
            blob, 
            { headers: {'Content-Type': type} }
            );
          // console.log('   Upload no ' + part_number + '; Etag: ' + retCode.headers.etag)
          // console.log(retCode.headers)
          // parts.push({'ETag': retCode.headers.etag, 'PartNumber': part_number});
          promiseArray.push(retCode);


          offset += chunk_size; // Increment the index position(chunk) 
          i += chunk_size; // Keeping track of when to exit, by incrementing till we reach file size(end of file).
          part_number = part_number + 1;

          console.log(i);
        }

        let resolvedArray = await Promise.all(promiseArray);
        console.log(resolvedArray, ' resolvedAr')

        resolvedArray.forEach((resolvedPromise, index) => {
          parts.push({
            'ETag': resolvedPromise.headers.etag, 
            'PartNumber': index + 1});
        })

        complete_request = {
          'fileName': name, 
          'uploadId': data['uploadId'], 
          'parts': parts
          };

        retCode = await postData(complete_mpu_url, complete_request);        
        var endTime = performance.now();
        var totalTime = endTime - startTime;
        var formatTime = msToTime(totalTime);
    
        console.log(formatTime);
        output.innerHTML = "Completed Transfer. Total time consumed : " + formatTime;
    
      }
    };

    upload();


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

function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + " hr: " + minutes + " min :" + seconds + "." + milliseconds + " sec";
}

