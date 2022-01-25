class Enrollment::ApiIndemnitesJournalieresCnam < Enrollment
  protected

  def submit_validation
    super

    scopes_validation
    previous_enrollment_id_validation
    responsable_technique_validation
  end
end
