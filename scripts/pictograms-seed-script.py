import os
import boto3
from botocore.exceptions import NoCredentialsError, ClientError

def upload_to_s3(bucket_name, folder_path, s3_client): 
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            local_path = os.path.join(root, file)
            relative_path = os.path.relpath(local_path, folder_path)
            s3_path = relative_path

            # Uncomment while running on Windows
            # s3_path = relative_path.replace("\\", "/")
            try:
                s3_client.upload_file(local_path, bucket_name, s3_path, ExtraArgs={'ACL': 'public-read'})
                print(f'Successfully uploaded {local_path} to s3://{bucket_name}/{s3_path}')
            except FileNotFoundError:
                print(f'The file was not found: {local_path}')
            except NoCredentialsError:
                print('Credentials not available')
            except ClientError as e:
                print(f'Failed to upload {local_path}: {e}')

if __name__ == "__main__":
    # Define your bucket name and the folder to upload
    bucket_name = 'xcelpros-weberp-web-assets'
    # TODO Update the path to scan for assets
    folder_path = 'path/to/your/folder'

    # Initialize a session using Amazon S3
    # TODO update the client with necessary credentials 
    s3_client = boto3.client('s3')

    # Upload the folder
    upload_to_s3(bucket_name, folder_path, s3_client)
