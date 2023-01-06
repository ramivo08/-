
<ul class="domainList">
	<li style="list-style: none;">
		<div class="row domainTitle">
			<div class="col-sm-4">Name</div>
			<div class="col-sm-4">Description</div>
			<div class="col-sm-4">Type</div>

		</div>
	</li>
	<c:forEach var="domain" items="${domains}" varStatus="status">
		<li style="list-style: none;">
			<div class="row domainContent">
				<div class="col-sm-4 domainName">${ domain.name }</div>
				<div class="col-sm-4 domainDes">${ domain.des }</div>
				<div class="col-sm-4 domainType">${ domain.type }</div>
			</div>
		</li>
	</c:forEach>
	<div class="row">
		<div class="col-sm-12" style="text-align: center; margin-top: 10px">
			<button type="button" class="btn btn-outline-dark"
				style="border-radius: 1rem;" onclick="javascript:addingModal()">+</button>
		</div>

	</div>
</ul>


<div class="modal fade in" id="domainAddModal" tabindex="-1"
	role="dialog" aria-labelledby="domainAddModalCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<span>${ category } domain</span>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form id="domainAddForm" method="post">
				<input type=hidden name="domainCategory" value="${ category }" />
				<div class="modal-body">
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">Name</label>
						<div class="col-sm-9">
							<input type="text" name="domainName"
								class="form-control ui-autocomplete-input" id="domainName"
								placeholder="Input name" required>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">Description</label>
						<div class="col-sm-9">
							<textarea class="form-control ui-autocomplete-input"
								name="domainDes" id="domainDes" rows="5"></textarea>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">Type</label>
						<div class="col-sm-9">
							<input type="text" name="domainType"
								class="form-control ui-autocomplete-input" id="domainType"
								placeholder="Input domain" required>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-dismiss="modal">
						<i class="fa fa-remove"></i> Close
					</button>
					<button type="button" class="btn btn-primary"
						onclick="javascript:addDomain()">
						<i class="fa fa-save"></i> Save
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="modal fade in" id="domainInformationModal" tabindex="-1"
	role="dialog" aria-labelledby="domainInformationModallCenterTitle"
	aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<span>${ category } domain</span>
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<form id="domainInformaionForm" method="post">
				<input type=hidden name="domainCategory" value="${ category }" /> <input
					type=hidden name="domainOrgName" id="domainOrgName" />
				<div class="modal-body">
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">Name</label>
						<div class="col-sm-9">
							<input type="text" name="domainName"
								class="form-control ui-autocomplete-input"
								id="domainInformationName" placeholder="Input name" required>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">Description</label>
						<div class="col-sm-9">
							<textarea class="form-control ui-autocomplete-input"
								name="domainDes" id="domainInformationDes" rows="5"></textarea>
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-3 col-form-label">Type</label>
						<div class="col-sm-9">
							<input type="text" name="domainType"
								class="form-control ui-autocomplete-input"
								id="domainInformationType" placeholder="Input domain" required>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-danger"
						onClick="javascript:removeDomain()">
						<i class="fa fa-remove"></i> Remove
					</button>
					<button type="button" class="btn btn-primary"
						onclick="javascript:editDomain()">
						<i class="fa fa-edit"></i> Edit
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

