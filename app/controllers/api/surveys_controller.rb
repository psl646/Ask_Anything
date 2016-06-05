class Api::SurveysController < ApplicationController
  def index
    @surveys = current_user.surveys
    render "api/surveys/index"
  end

  def create
    if (Survey.create_survey (params, current_user))
      @surveys = current_user.surveys
      render "api/surveys/index"
    else
      @errors = @surveys.errors.full_messages
      render "api/shared/errors", status: 409
    end
  end
end
