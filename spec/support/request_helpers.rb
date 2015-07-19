module RequestHelpers
  %w(get post put delete).each do |meth|
    define_method("api_#{meth}") do |user, uri, params = {}, env_params = {}|
      stub_warden(user)
      request_headers = api_headers
      uri = '/' + uri unless uri[0] == '/' || uri['http']
      send(meth, uri, params, request_headers.merge(env_params))
    end
  end

  def api_headers
    {
      'HTTP_ACCEPT' => 'application/vnd.venity+json; version=1'
    }
  end

  def json_response
    @json_response ||= JSON.parse(response.body)
  end

  private

  def stub_warden(user)
    warden = Warden::Proxy.new({}, warden_manager)
    warden.set_user(user, scope: :user)
    allow_any_instance_of(ApplicationController)
      .to receive(:warden).and_return(warden)
  end

  def warden_manager
    middleware = Rails.application.config.middleware.detect do |m|
      m.name == 'Warden::Manager'
    end.block
    Warden::Manager.new(nil, &middleware)
  end
end
