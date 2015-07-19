FactoryGirl.define do
  factory :car do
    make  { FFaker::Lorem.word }
    model { FFaker::Lorem.word }
    production_year { rand(1999..Time.zone.now.year) }
    profile
  end
end
