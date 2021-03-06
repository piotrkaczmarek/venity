class PhotoUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  configure do |c|
    c.fog_public = true
  end

  version :thumb do
    process resize_to_fill: [350, 200]
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
