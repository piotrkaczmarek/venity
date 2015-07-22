FactoryGirl.define do
  factory :user do
    email { FFaker::Internet.email }
    password { SecureRandom.hex(5) }
    profile
  end
  factory :owner, parent: :user do
  end
end
