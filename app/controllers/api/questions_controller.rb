class Api::QuestionsController < ApplicationController
  def index
    @questions = Question.where(author_id: params[:author_id]).all
    render json: @questions
  end

  def show
    @question = Question.find_by_id(params[:id])
    render json: @question
  end

  def create

  end

  def destroy

  end

end

#   def create
#     @question = Question.new(questions_params)
#     parmas[:answers].each do |answer|
#       @question.answers << Answer.new(answer)
#     end
#   end
#   @question.save!
# end
#
#
# $.ajax({
#    url: ".."
#    data: {
#      question: {},
#      answers: [
#        {answer}
#      ]
#    }
#   })
