class CompetenciesController < ApplicationController
    def index
        competencies = Competency.all
        render json: competencies
    end

    def show
        competency = Competency.find_by(id: params[:id])
        if competency
          render json: competency
        else
          render json: { error: "competency not found" }, status: :not_found
        end
    end

    def create
        competency = Competency.create(competency_params)
        render json: competency, status: :created
    end

    def update
        competency = Competency.find_by(id: params[:id])
        if competency
            competency.update(competency_params)
            if competency.valid?
                render json: competency, status: :created
            else
                render json: {errors: competency.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render json: { error: "competency not found" }, status: :not_found
        end
    end

    private
    def competency_params
        params.permit(:mastery, :notes, :competency_category_id, :report_id)
    end
end
