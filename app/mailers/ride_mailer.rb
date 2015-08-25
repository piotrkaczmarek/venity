class RideMailer < ApplicationMailer
  def new_request(ride, driver, owner)
    @ride = ride
    @car = ride.car
    @driver = driver
    @owner = owner
    mail(to: @owner.user.email,
         bcc: User.admins.pluck(:email),
         subject: new_request_subject)
  end

  private

  def new_request_subject
    t('mailers.ride.new_request.subject',
      driver_name: @driver.first_name,
      make: @car.make,
      model: @car.model)
  end
end
