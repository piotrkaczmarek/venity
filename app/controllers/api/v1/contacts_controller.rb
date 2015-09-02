module Api
  module V1
    class ContactsController < ApplicationController
      skip_before_action :authenticate_user!, only: [:create]

      def create
        contact = Contact.create(contact_params)
        respond_with(contact)
      end

      private

      def contact_params
        params.permit(:email)
      end
    end
  end
end
