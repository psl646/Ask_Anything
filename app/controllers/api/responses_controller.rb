class Api::ResponsesController < ApplicationController
  def index
  end

  def create
    answer_id = params[:response][:answer_id]
    user_id = params[:response][:user_id]
    answer = Answer.find(answer_id)
    @question = answer.question

    if user_id
      response = @question.responses.where(user_id: user_id)
      if response.empty?
        Response.create(answer_id: answer_id, user_id: user_id)
      end
    elsif !session[:anonymous]
      Response.create(answer_id: answer_id)
      session[:anonymous] = true
    end
    render "api/questions/show"
  end

  # This session[:anonymous] only works for once question.

  def destroy
    response = Response.find(params[:id])
    if response[:user_id].nil?
      session[:anonymous] = false
    end
    @question = response.question
    response.destroy
    render "api/questions/show"
  end

  private

  def response_params
    params.require(:response).permit(:answer_id, :user_id)
  end
end
