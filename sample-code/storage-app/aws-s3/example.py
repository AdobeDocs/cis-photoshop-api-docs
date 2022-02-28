import boto3
from botocore.config import Config
import requests
import json

client_id = ''
token = ''

region = ''
bucket = ''
src_key = 'path/to/your/image.jpg'
dest_key = 'path/to/where/you/want/your/output.jpg'

#path to your service api. This example is showing autoTone API
autotone_url = 'https://image.adobe.io/lrService/autoTone'


def get_presigned_url(bucket, key, operation, expires_in, region):
    s3 = boto3.client('s3', config=Config(signature_version='s3v4'), region_name=region)
    url = s3.generate_presigned_url(operation, Params={'Bucket': bucket, 'Key': key}, ExpiresIn=expires_in)
    return url

def invoke_autotone(url, headers, payload):
    resp = requests.post(url, json=payload, headers=headers)
    return resp

def get_autotone_status(url, headers):
    resp = requests.get(url, headers=headers)
    return resp

def poll_status(resp, headers):
    tmp = json.loads(resp.text)
    url = tmp['_links']['self']['href']
    print(url)
    while True:
        resp_status = get_autotone_status(url, headers)
        tmp_status = json.loads(resp_status.text)
        status = tmp_status['outputs'][0]['status']
        if status == 'failed' or status == 'succeeded':
            print(status)
            return resp
        else:
            print(status)


input_scr_url = get_presigned_url(bucket, src_key, 'get_object', 3600, region)
output_dest_url = get_presigned_url(bucket, dest_key, 'put_object', 3600, region)

headers = { "Authorization": f"Bearer {token}", "x-api-key" : client_id }
payload = {
  "inputs":{
    "href": input_scr_url,
    "storage": "external"
  },
  "outputs": [
    {
      "href": output_dest_url,
      "storage": "external",
      "type": "image/jpeg"
    }
  ]
}

resp = invoke_autotone(autotone_url, headers, payload)
status = poll_status(resp, headers)

print(resp)
@khound
