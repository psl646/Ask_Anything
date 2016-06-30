class Api::ResponsesController < ApplicationController
  def index
  end

  def create
    answer_id = params[:response][:answer_id]
    user_id = params[:response][:user_id]
    answer = Answer.find(answer_id)
    @question = answer.question
    question_id_symbol = @question.id

    if user_id
      response = @question.responses.where(user_id: user_id)
      if response.empty?
        Response.create(answer_id: answer_id, user_id: user_id)
        Pusher.trigger('question_' + @question.id.to_s, 'response_recorded', {})
        Pusher.trigger('survey_changed', 'response_recorded', {})
      end
    elsif !session[question_id_symbol]
      Response.create(answer_id: answer_id)
      Pusher.trigger('question_' + @question.id.to_s, 'response_recorded', {})
      Pusher.trigger('survey_changed', 'response_recorded', {})
      session[question_id_symbol] = true
    end
    render "api/questions/show"
  end

  # This session[:anonymous] only works once.

  def destroy
    response = Response.find(params[:id])
    if response[:user_id].nil?
      @question = response.question
      question_id_symbol = @question.id
      session[question_id_symbol] = false
    end
    @question = response.question
    response.destroy
    Pusher.trigger('question_' + @question.id.to_s, 'response_recorded', {})
    Pusher.trigger('survey_changed', 'response_recorded', {})
    render "api/questions/show"
  end

  private

  def response_params
    params.require(:response).permit(:answer_id, :user_id)
  end
end
