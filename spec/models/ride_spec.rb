require 'rails_helper'

RSpec.describe Ride, type: :model do
  describe 'validation' do
    describe 'availability' do
      let(:car) { create(:car) }

      subject { build(:ride, car: car, start_datetime: 2.days.since, end_datetime: 5.days.since) }

      context 'when dates are available' do
        before do
          create(:ride, car: car, state: 'accepted', start_datetime: Time.zone.now, end_datetime: 1.day.since)
          create(:ride, car: car, state: 'accepted', start_datetime: 6.days.since, end_datetime: 7.days.since)
        end
        it { is_expected.to be_valid }
      end

      context 'when start_date collides' do
        before do
          create(:ride, car: car, state: 'accepted', start_datetime: 1.day.since, end_datetime: 3.days.since)
        end

        it { is_expected.not_to be_valid }
      end

      context 'when end_date collides' do
        before do
          create(:ride, car: car, state: 'accepted', start_datetime: 3.day.since, end_datetime: 6.days.since)
        end

        it { is_expected.not_to be_valid }
      end

      context 'when there is other ride between start and end' do
        before do
          create(:ride, car: car, state: 'accepted', start_datetime: 3.day.since, end_datetime: 4.days.since)
        end

        it { is_expected.not_to be_valid }
      end

      context 'when there is other longer ride around dates' do
        before do
          create(:ride, car: car, state: 'accepted', start_datetime: 1.day.since, end_datetime: 8.days.since)
        end

        it { is_expected.not_to be_valid }
      end

      context 'when both dates collide with different rides' do
        before do
          create(:ride, car: car, state: 'accepted', start_datetime: 1.day.since, end_datetime: 3.days.since)
          create(:ride, car: car, state: 'accepted', start_datetime: 4.day.since, end_datetime: 6.days.since)
        end

        it { is_expected.not_to be_valid }
      end

      context 'when not accepted' do
        before { create(:ride, car: car, start_datetime: 1.day.since, end_datetime: 3.days.since) }

        it { is_expected.to be_valid }
      end
    end

    describe 'geographic coordinates' do
      context 'when end_lng is missing' do
        subject { build(:ride, end_lng: nil) }

        it { is_expected.not_to be_valid }
      end

      context 'when start_lat is not within range' do
        subject { build(:ride, start_lat: -200) }

        it { is_expected.not_to be_valid }
      end
    end
  end
end
