class ReportsController < ApplicationController
    def index
        reports = Report.all
        render json: reports
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
        render json: report, status: :created
    end

    private
    def report_params
        params.permit(:title, :course_id, :student_id)
    end
end
