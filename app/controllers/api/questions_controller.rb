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
    if (Question.performTransaction(params, current_user))
      @question = Question.last
      render "api/questions/show"
    else
      render @question.errors.full_messages
    end
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

# $.ajax({
#    url: ".."
#    data: {
#      question: {},
#      answers: [
#        {answer}
#      ]
#    }
#   })
