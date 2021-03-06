Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'registrations' }
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  match '/delayed_job' => DelayedJobWeb, anchor: false, via: [:get, :post]

  # You can have the root of your site routed with "root"
  root 'home#index'

  api(vendor_string: 'venity', default_version: 1) do
    version(1) do
      get :me, to: 'profiles#me'
      put :me, to: 'profiles#update'

      resources :cars, except: [:new, :edit] do
        resources :rides, only: [:create]
        resources :photos, only: [:create]
      end
      resources :rides, only: [] do
        get :driven, on: :collection
        get :owned,  on: :collection
        put :accept, on: :member
        put :reject, on: :member
        put :cancel, on: :member
      end
    end
  end
  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  get '*path' => 'home#index'
end
