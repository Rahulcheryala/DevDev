import re
import argparse


def edit_js_file(file_path, new_email, new_first_name, new_password):

    # Read the content of the JS file
    with open(file_path, 'r') as file:
        file_content = file.read()

    # Replace the email, password, and first name using regex
    updated_content = re.sub(
        r'email:\s*".*?",', f'email: "{new_email}",', file_content)
    updated_content = re.sub(r'password:\s*".*?",',
                             f'password: "{new_password}",', updated_content)
    updated_content = re.sub(r'firstName:\s*".*?",',
                             f'firstName: "{new_first_name}",', updated_content)

    # Write the modified content back to the JS file
    with open(file_path, 'w') as file:
        file.write(updated_content)

    # print(f"JS file updated successfully! New password: {new_password}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Edit email and first name in a JS file.")
    js_file_path = '/home/ubuntu/WebERP/packages/database/src/seed/admin.ts'
    # js_file_path = 'packages\\database\\src\\seed\\admin.ts'
    parser.add_argument('new_email', type=str,
                        help="New email to be set in the JS file")
    parser.add_argument('new_password', type=str,
                        help="New email to be set in the JS file")

    parser.add_argument('new_first_name', type=str,
                        help="New first name to be set in the JS file")

    args = parser.parse_args()

    edit_js_file(file_path=js_file_path, new_email=args.new_email,
                 new_first_name=args.new_first_name,
                 new_password=args.new_password)
