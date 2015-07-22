FactoryGirl.define do
  factory :profile do
    first_name { FFaker::Name.first_name }
    last_name  { FFaker::Name.last_name  }
    user
  end
  factory :owner, parent: :profile
end
