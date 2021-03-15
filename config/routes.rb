Rails.application.routes.draw do
  scope "/api" do
    resources :exercises
    resources :workouts
  end

  get "*path", to: "pages#index"
end
