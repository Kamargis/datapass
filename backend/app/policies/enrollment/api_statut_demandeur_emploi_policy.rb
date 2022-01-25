class Enrollment::ApiStatutDemandeurEmploiPolicy < EnrollmentPolicy
  def permitted_attributes
    res = super

    res.concat([
      scopes: [
        :codeStatutIndividu,
        :libelleStatutIndividu
      ]
    ])

    res
  end
end
