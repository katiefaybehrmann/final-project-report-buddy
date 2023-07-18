class CompetencyCategoriesController < ApplicationController
    def index
        competency_categories = CompetencyCategory.all
        render json: competency_categories
    end

    def show
        competency_category = CompetencyCategory.find_by(id: params[:id])
        if competency_category
          render json: competency_category
        else
          render json: { error: "competency category not found" }, status: :not_found
        end
    end

    def create
        competency_category = CompetencyCategory.create(competency_category_params)
        render json: competency_category, status: :created
    end

    private
    def competency_category_params
        params.permit(:name, :description, :course_id)
    end
end
