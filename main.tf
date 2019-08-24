resource "aws_dynamodb_table" "group" {
  name           = "AnonymousPetition-Group"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "groupId"

  attribute {
    name = "groupId"
    type = "S"
  }

  tags = {
    Name        = "dynamodb-table-1"
    Environment = "production"
  }
}

