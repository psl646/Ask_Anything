class Api::SurveysController < ApplicationController
  def index
    @surveys = current_user.surveys
    render "api/surveys/index"
  end
end
