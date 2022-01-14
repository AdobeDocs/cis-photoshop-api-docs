# need to pip install azure-storage-blob

from datetime import datetime, timedelta
from azure.storage.blob import BlobServiceClient, generate_account_sas, ResourceTypes, AccountSasPermissions

storage_account_name = ""
account_access_key = ""
storage_container_name=""
blob_path=""

sas_token = generate_account_sas(
    account_name=storage_account_name,
    account_key=account_access_key,
    resource_types=ResourceTypes(object=True),
    permission=AccountSasPermissions(read=True),
    expiry=datetime.utcnow() + timedelta(hours=1)
)

the_sas_url = f"https://{storage_account_name}.blob.core.windows.net/{storage_container_name}/{blob_path}?{sas_token}"
print(the_sas_url)
