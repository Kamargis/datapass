class Enrollment::LeTaxi < Enrollment
  protected

  def submit_validation
    super

    technical_team_validation
    scopes_validation
    responsable_technique_validation
  end
end
