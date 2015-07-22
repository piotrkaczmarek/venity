FactoryGirl.define do
  factory :user do
    email { FFaker::Internet.email }
    password { SecureRandom.hex(5) }
  end
end
