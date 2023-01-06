				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
					<div class="form-group row">
						<label class="col-sm-2 col-form-label">Title</label>
						<div class="col-sm-10">
							<input type="text" name="bbsSubject" class="form-control ui-autocomplete-input" id="title" placeholder="Input title" autocomplete="off" value="${ bbsSubject }" />
						</div>
					</div>
					<div class="form-group row">
						<label class="col-sm-2 col-form-label">Content</label>
						<div class="col-sm-10">
							<textarea class="form-control ui-autocomplete-input" name="bbsCont" id="content" rows="5">${ bbsCont }</textarea>
						</div>
					</div>
				
					<div class="form-group row">
                        <label class="col-sm-2 control-label">
                            Files
                        </label>
                        <div class="col-sm-10">
                            <input id="files" type="file" class="form-control-file" multiple data-show-upload="true" data-show-caption="true" name="upfile">
                        </div>
					</div>
