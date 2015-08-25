class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :profile, dependent: :destroy

  scope :admins, -> { where(admin: true) }

  def admin!
    update_attributes!(admin: true)
  end
end
