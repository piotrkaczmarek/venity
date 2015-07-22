class Responder < ActionController::Responder
  def to_json
    if success?
      return not_found! if @resource.blank?
      return acknowledge if options[:acknowledge]
      render({ json: @resource }.merge(options))
    else
      render_errors
    end
  rescue ActionView::MissingTemplate => e
    api_behavior(e)
  end

  private

  def acknowledge
    render json: { message: options.delete(:acknowledge) }, status: :ok
  end

  def success?
    (get? || !has_errors? || response_overridden?) && persisted? && valid?
  end

  def persisted?
    @resource.respond_to?(:persisted?) ? @resource.persisted? : true
  end

  def valid?
    @resource.respond_to?(:valid?) ? @resource.valid? : true
  end

  def render_errors
    render json: { errors: @resource.errors }, status: :conflict
  end

  def not_found!
    render json: { message: 'record not found' }, status: :not_found
  end
end
