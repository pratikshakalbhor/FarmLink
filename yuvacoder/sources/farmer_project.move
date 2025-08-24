module farmer_project::RiceSupplyChainSimple {
    use std::signer;
    use std::vector;
    /// Struct representing a Rice Batch with tracking information
    struct RiceBatch has store, key {
        batch_id: u64,                  // Unique identifier for the batch
        current_owner: address,         // Current owner of the batch
        quantity_kg: u64,               // Quantity in kilograms
        origin_farm: address,           // Original farm address for traceability
        transfer_count: u64,            // Number of times batch has been transferred
    }

    /// Function to create a new rice batch (typically called by farmer)
    /// Initializes batch with farmer as origin and current owner
    public fun create_rice_batch(
        farmer: &signer,
        batch_id: u64,
        quantity_kg: u64
    ) {
        let farmer_address = signer::address_of(farmer);
        let batch = RiceBatch {
            batch_id,
            current_owner: farmer_address,
            quantity_kg,
            origin_farm: farmer_address,
            transfer_count: 0,
        };
        move_to(farmer, batch);
    }

    /// Function to transfer rice batch to new owner in supply chain
    /// Tracks transfers and updates ownership while maintaining traceability
    public fun transfer_rice_batch(
        current_owner: &signer,
        new_owner_address: address,
        batch_owner_address: address
    ) acquires RiceBatch {
        let current_owner_address = signer::address_of(current_owner);
        let batch = borrow_global_mut<RiceBatch>(batch_owner_address);
        
        // Verify current owner has permission to transfer
        assert!(batch.current_owner == current_owner_address, 1);
        
        // Update batch ownership and increment transfer count
        batch.current_owner = new_owner_address;
        batch.transfer_count = batch.transfer_count + 1;
    }
}