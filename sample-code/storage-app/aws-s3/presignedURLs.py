import boto3
import requests
import json

client_id = ''
token = ''

region = ''
bucket = ''
src_key = 'path/to/your/image.jpg'
dest_key = 'path/to/where/you/want/your/output.jpg'


def get_presigned_url(bucket, key, operation, expires_in, region):
    s3 = boto3.client('s3', region_name=region)
    url = s3.generate_presigned_url(operation, Params={'Bucket': bucket, 'Key': key}, ExpiresIn=expires_in)
    return url

input_scr_url = get_presigned_url(bucket, src_key, 'get_object', 3600, region)
output_dest_url = get_presigned_url(bucket, dest_key, 'put_object', 3600, region)
