class ReportsController < ApplicationController
    def index
        reports = Report.all
        render json: reports, status: :created
    end

    def show
        report = Report.find_by(id: params[:id])
        if report
          render json: report
        else
          render json: { error: "report not found" }, status: :not_found
        end
    end

    def create
        report = Report.create(report_params)
        if report.valid?
            render json: report, status: :created
        else
            render_unprocessable_entity_response
        end
    end

    private
    def render_unprocessable_entity_response
        render json: {errors: reports.errors.full_messages}, status: :unprocessable_entity
    end

    def report_params
        params.permit(:title, :course_id, :student_id)
    end
end
