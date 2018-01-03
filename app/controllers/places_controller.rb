class PlacesController < ApplicationController

  def index
    place = Place.all.order(:id)
    render json: place.as_json
  end

  def create
    place = Place.new(
      name: params[:name],
      address: params[:address]
    )

    if place.save
      render json: place.as_json
    else
      render json: {errors: place.errors.full_messages}, status: :bad_request
    end
  end

  def update
    place = Place.find_by(id: params[:id].to_i)
    place.name = params[:name]
    place.price = params[:address]

    if place.save
      render json: place.as_json
    else
      render json: {errors: place.errors.full_messages}, status: :bad_request
    end
  end

  def destroy
    place = Place.find_by(id: params[:id].to_i)
    place.destroy
    render json: {message: "You have deleted this item"}
  end
end
