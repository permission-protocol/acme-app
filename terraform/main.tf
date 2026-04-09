# E2E Test: Infrastructure change that should be DENIED
# Disables all security controls

resource "aws_security_group" "allow_all" {
  name        = "allow_all_traffic"
  description = "DANGEROUS: Allow all inbound and outbound traffic"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow ALL inbound traffic from anywhere"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_s3_bucket_public_access_block" "disable_protection" {
  bucket = var.bucket_id
  
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
