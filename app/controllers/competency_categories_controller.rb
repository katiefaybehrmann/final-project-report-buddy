class CompetencyCategoriesController < ApplicationController
    skip_before_action :authorized, only: [:destroy]
    def index
        competency_categories = CompetencyCategory.all
        render json: competency_categories
    end

    def show
        competency_category = CompetencyCategory.find_by(id: params[:id])
        if competency_category
          render json: competency_category, include: ['course','course.teacher']
        else
          render_not_found_response
        end
    end

    def create
        competency_category = CompetencyCategory.create(competency_category_params)
        if competency_category.valid?
            render json: competency_category, status: :created
        else
            render json: {errors: competency_category.errors.full_messages}, status: :unprocessable_entity
        end
        
    end

    def destroy
        competency_category = CompetencyCategory.find_by(id: params[:id])
        if competency_category
            competency_category.destroy
            head :no_content
        else
            render_not_found_response
        end
    end

    private
    def competency_category_params
        params.permit(:name, :description, :course_id)
    end


    def render_not_found_response
        render json: { error: "Competency not found" }, status: :not_found
    end
end
