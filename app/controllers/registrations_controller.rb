class RegistrationsController < Devise::RegistrationsController
  def create
    profile = Profile.new(profile_attributes)
    if profile.valid?
      super do |resource|
        resource.profile = profile
      end
    else
      user = User.new(user_attributes)
      user.errors.each { |k, v| profile.errors.add(k, v) } unless user.valid?
      respond_with(profile)
    end
  end

  private

  def user_attributes
    params.require(:user).permit(resource_params.keys - profile_attributes.keys)
  end

  def profile_attributes
    {
      first_name: params[:user][:first_name],
      last_name: params[:user][:last_name]
    }.with_indifferent_access
  end
end
