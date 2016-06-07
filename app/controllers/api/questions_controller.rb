class Api::QuestionsController < ApplicationController
  def index
    @questions = current_user.questions
    render "api/questions/index"
  end

  def show
    @question = Question.find_by_id(params[:id])
    render "api/questions/show"
  end

  def create
    if Question.create_questions(params, current_user)
      @question = current_user.questions.last
      render "api/questions/show"
    else
      @errors = @question.errors.full_messages
      render "api/shared/errors", status: 409
    end
  end

  def destroy

  end

end
