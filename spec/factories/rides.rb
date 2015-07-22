FactoryGirl.define do
  factory :ride do
    association :driver, factory: :profile
    car
    start_datetime  { rand(1..4).days.since }
    end_datetime { rand(5..10).days.since }
    start_lng { rand(-180.0..180.0) }
    start_lat { rand(-90.0..90.0) }
    end_lng { rand(-180.0..180.0) }
    end_lat { rand(-90.0..90.0) }
  end
end
