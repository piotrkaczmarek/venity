if Rails.env.test? || Rails.env.development?
  CarrierWave.configure do |config|
    config.storage = :file
  end
else
  CarrierWave.configure do |config|
    config.storage = :fog
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     ENV['CARRIERWAVE_AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['CARRIERWAVE_AWS_SECRET_ACCESS_KEY'],
      region:                'eu-central-1'
    }
    config.fog_directory  = 'venity'
    config.fog_public = false
    config.fog_use_ssl_for_aws = true
  end
end
