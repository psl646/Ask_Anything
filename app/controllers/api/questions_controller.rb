class Api::QuestionsController < ApplicationController
  def index
    if current_user
      @questions = current_user.questions
      render "api/questions/index"
    else
      @errors = ["These aren't the questions you’re looking for!"]
      render "api/shared/errors", status: 403
    end
  end

  def show
    @question = Question.find_by_id(params[:id])

    if @question
      if params[:location] != "#/questions"
        render "api/questions/show"
      elsif @question.author == current_user
        render "api/questions/show"
      else
        @errors = ["This isn't the question you’re looking for!"]
        render "api/shared/errors", status: 403
      end
    else
      @errors = ["This question does not exist!"]
      render "api/shared/errors", status: 404
    end
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
        current_user[:active_question_id] = nil
      else
        @question[:active] = true
        current_user[:active_question_id] = @question[:id]
      end

      session[:session_token] = current_user.reset_session_token!

      if @question.save
        Question.inactivate_other_questions(@question, current_user)
        @questions = current_user.questions
        Pusher.trigger('question_updated', 'question_changed', {})
        render "api/questions/index"
      else
        @errors = @question.errors.full_messages
        render "api/shared/errors", status: 409
      end
    elsif Question.updateQuestion(@question, params, current_user)
      Pusher.trigger('question_updated', 'question_changed', {})
      render "api/questions/show"
    else
      @errors = @question.errors.full_messages
      render "api/shared/errors", status: 409
    end
  end

  def destroy
    @question = Question.find(params[:id])
    @question.destroy
    Pusher.trigger('question_updated', 'question_changed', {})
    @questions = current_user.questions
    render "api/questions/index"
  end
end
