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

  def update
    @question = Question.find(params[:id])

    if (!!params[:toggle])
      if (@question[:active])
        @question[:active] = false
      else
        @question[:active] = true
      end
    end

    if @question.save
      Question.inactivate_other_questions(@question, current_user)
      @questions = current_user.questions
      render "api/questions/index"
    else
      @errors = @question.errors.full_messages
      render "api/shared/errors", status: 409
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    @questions = current_user.questions
    render "api/questions/index"
  end

  private

  def question_params
    # params.require(:question).permit(:)
  end
end
