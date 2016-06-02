class Api::SurveysController < ApplicationController
  def index
    @surveys = Survey.where(author_id: current_user.id).all
    render json: @surveys
  end
end
