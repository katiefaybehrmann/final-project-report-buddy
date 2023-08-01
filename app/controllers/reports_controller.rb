class ReportsController < ApplicationController
    skip_before_action :authorized, only: [:index]

    def index
        reports = Report.all
        render json: reports, status: :created
    end

    def show
        report = Report.find_by(id: params[:id])
        if report
          render json: report
        else
            render_not_found_response
        end
    end

    def create
        report = Report.create(report_params)
        if report.valid?
            render json: report, status: :created
        else
            render json: {errors: report.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update
        report = Report.find_by(id: params[:id])
        if report
            report.update(text: params[:text])
            if report.valid?
                render json: report, status: :created
            else
                render json: {errors: report.errors.full_messages}, status: :unprocessable_entity
            end
        else
            render_not_found_response
        end
    end

    def destroy
        report = Report.find_by(id: params[:id])
        if report
            report.destroy
            head :no_content
        else
            render_not_found_response
        end
    end


    private
    def render_not_found_response
        render json: { error: "report not found" }, status: :not_found
    end

    def report_params
        params.permit(:title, :course_id, :student_id)
    end
end
